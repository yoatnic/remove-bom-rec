const fs = require("fs");
const stripBom = require("strip-bom");
const fl = require("node-filelist");
const args = require("args");
const path = require("path");

args
  .option("dir", "target directory", ".")
  .option("ext", "comma separeted file extensions", "md,js,txt");

const flags = args.parse(process.argv);

fl.read(
  [path.resolve(flags.dir)],
  { ext: flags.ext.replace(/,/g, "|") },
  results => {
    results.forEach(f => {
      const text = fs.readFileSync(f.path, { encoding: "utf-8" });
      const stripped = stripBom(text);
      fs.writeFileSync(f.path, stripped);
    });
  }
);
