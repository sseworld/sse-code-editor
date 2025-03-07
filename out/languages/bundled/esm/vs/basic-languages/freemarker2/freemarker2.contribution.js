/*!-----------------------------------------------------------------------------
 * Copyright (c) SSE World. All rights reserved.
 * Version: 1.0.0(0a8ae934ef197f533a1dfc2709984aaf6061d2a1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/


// src/basic-languages/freemarker2/freemarker2.contribution.ts
import { registerLanguage } from "../_.contribution";
registerLanguage({
  id: "freemarker2",
  extensions: [".ftl", ".ftlh", ".ftlx"],
  aliases: ["FreeMarker2", "Apache FreeMarker2"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
      }).then((m) => m.TagAngleInterpolationDollar);
    } else {
      return import("./freemarker2").then((m) => m.TagAutoInterpolationDollar);
    }
  }
});
registerLanguage({
  id: "freemarker2.tag-angle.interpolation-dollar",
  aliases: ["FreeMarker2 (Angle/Dollar)", "Apache FreeMarker2 (Angle/Dollar)"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
      }).then((m) => m.TagAngleInterpolationDollar);
    } else {
      return import("./freemarker2").then((m) => m.TagAngleInterpolationDollar);
    }
  }
});
registerLanguage({
  id: "freemarker2.tag-bracket.interpolation-dollar",
  aliases: ["FreeMarker2 (Bracket/Dollar)", "Apache FreeMarker2 (Bracket/Dollar)"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
      }).then((m) => m.TagBracketInterpolationDollar);
    } else {
      return import("./freemarker2").then((m) => m.TagBracketInterpolationDollar);
    }
  }
});
registerLanguage({
  id: "freemarker2.tag-angle.interpolation-bracket",
  aliases: ["FreeMarker2 (Angle/Bracket)", "Apache FreeMarker2 (Angle/Bracket)"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
      }).then((m) => m.TagAngleInterpolationBracket);
    } else {
      return import("./freemarker2").then((m) => m.TagAngleInterpolationBracket);
    }
  }
});
registerLanguage({
  id: "freemarker2.tag-bracket.interpolation-bracket",
  aliases: ["FreeMarker2 (Bracket/Bracket)", "Apache FreeMarker2 (Bracket/Bracket)"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
      }).then((m) => m.TagBracketInterpolationBracket);
    } else {
      return import("./freemarker2").then((m) => m.TagBracketInterpolationBracket);
    }
  }
});
registerLanguage({
  id: "freemarker2.tag-auto.interpolation-dollar",
  aliases: ["FreeMarker2 (Auto/Dollar)", "Apache FreeMarker2 (Auto/Dollar)"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
      }).then((m) => m.TagAutoInterpolationDollar);
    } else {
      return import("./freemarker2").then((m) => m.TagAutoInterpolationDollar);
    }
  }
});
registerLanguage({
  id: "freemarker2.tag-auto.interpolation-bracket",
  aliases: ["FreeMarker2 (Auto/Bracket)", "Apache FreeMarker2 (Auto/Bracket)"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
      }).then((m) => m.TagAutoInterpolationBracket);
    } else {
      return import("./freemarker2").then((m) => m.TagAutoInterpolationBracket);
    }
  }
});
