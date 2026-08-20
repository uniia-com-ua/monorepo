// Script to emulate `cp -r ../../../apps/strapi/types/generated ./generated` command in a cross-platform way
// Inputs: strapiAppName

import { cp, mkdir, unlink, lstat, readlink } from "fs/promises"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function main() {
  const strapiAppName = process.argv[2]
  if (!strapiAppName) {
    console.error("Please provide the Strapi app name as an argument.")
    process.exit(1)
  }

  const sourceDir = join(
    __dirname,
    "../../../apps",
    strapiAppName,
    "types/generated"
  )
  const destDir = join(__dirname, "../generated")

  // check if destDir is linked to sourceDir, if so, unlink it first
  try {
    const destStat = await lstat(destDir)
    if (destStat.isSymbolicLink()) {
      const linkedPath = await readlink(destDir)
      console.log("linkedPath:", linkedPath)
      if (linkedPath === sourceDir) {
        await unlink(destDir)
        console.log(`Unlinked existing symbolic link at ${destDir}`)
      }
    }
  } catch {
    // destDir does not exist yet
  }

  try {
    await mkdir(destDir, { recursive: true })
    await cp(sourceDir, destDir, { recursive: true })
    console.log(`Types successfully copied to ${destDir} from ${sourceDir}`)
  } catch (error) {
    console.error("Error copying types:", error)
    process.exit(1)
  }
}

main()
