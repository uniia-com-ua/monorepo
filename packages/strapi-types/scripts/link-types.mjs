// Script to emulate `cp -r ../../../apps/strapi/types/generated ./generated` command in a cross-platform way
// Inputs: strapiAppName

import { lstat, mkdir, rm, symlink } from "fs/promises"
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

  try {
    await mkdir(dirname(destDir), { recursive: true })

    try {
      await lstat(destDir)
      await rm(destDir, { recursive: true, force: true })
    } catch {
      // destDir does not exist yet
    }

    const type = process.platform === "win32" ? "junction" : "dir"
    await symlink(sourceDir, destDir, type)

    console.log(`Linked Strapi types from ${sourceDir} to ${destDir}`)
  } catch (error) {
    console.error("Error linking types:", error)
    process.exit(1)
  }
}

main()
