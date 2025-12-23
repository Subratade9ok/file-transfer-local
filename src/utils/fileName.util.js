import fs from "fs";
import path from "path";

export function resolveFileName(dir, name) {
  let ext = path.extname(name);
  let base = path.basename(name, ext);
  let finalName = name;
  let counter = 0;

  while (fs.existsSync(path.join(dir, finalName))) {
    counter++;
    finalName = `${base} (${counter})${ext}`;
  }
  return finalName;
}
