import * as React from "react";
import { getSSE, loadSSE } from "../../../sse-loader";

/**
 * Can be used to render content only when monaco is loaded.
 */
export class SSELoader extends React.Component<
	{ children: (m: typeof monaco) => React.ReactChild },
	{ monaco?: typeof monaco }
> {
	constructor(props: any) {
		super(props);
		this.state = { monaco: getSSE() };
		if (!this.state.monaco) {
			loadSSE().then((monaco) => {
				this.setState({
					monaco,
				});
			});
		}
	}
	render() {
		if (!this.state.monaco) {
			return null;
		}
		return this.props.children(this.state.monaco);
	}
}

/**
 * Decorates a component so that it only gets mounted when monaco is loaded.
 */
export function withLoadedMonaco<TProps>(
	Component: React.FunctionComponent<TProps> | React.ComponentClass<TProps>
): any {
	return (props: TProps) => (
		<SSELoader>{() => <Component {...props} />}</SSELoader>
	);
}
