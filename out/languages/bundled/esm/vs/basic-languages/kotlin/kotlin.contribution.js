/*!-----------------------------------------------------------------------------
 * Copyright (c) SSE World. All rights reserved.
 * Version: 1.0.0(0a8ae934ef197f533a1dfc2709984aaf6061d2a1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/


// src/basic-languages/kotlin/kotlin.contribution.ts
import { registerLanguage } from "../_.contribution";
registerLanguage({
  id: "kotlin",
  extensions: [".kt", ".kts"],
  aliases: ["Kotlin", "kotlin"],
  mimetypes: ["text/x-kotlin-source", "text/x-kotlin"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/kotlin/kotlin"], resolve, reject);
      });
    } else {
      return import("./kotlin");
    }
  }
});
