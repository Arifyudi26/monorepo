import { getServerMode } from '@repo/ui/src/@core/utils/serverHelpers'

import UnderMaintenance from '@views/pages/misc/UnderMaintenance'

const UnderMaintenancePage = () => {
  const mode = getServerMode()

  return <UnderMaintenance mode={mode} />
}

export default UnderMaintenancePage
