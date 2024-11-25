import type { ChildrenType, Direction } from "@repo/ui/src/@core/types";
import { VerticalNavProvider } from "@repo/ui/src/@menu/contexts/verticalNavContext";
import { SettingsProvider } from "@repo/ui/src/@core/contexts/settingsContext";
import { ThemeProvider } from "@repo/ui";

import { getMode, getSettingsFromCookie } from "@repo/ui/src/@core/utils/serverHelpers";

type Props = ChildrenType & {
  direction: Direction;
};

const Providers = (props: Props) => {
  const { children, direction } = props;

  const mode = getMode();
  const settingsCookie = getSettingsFromCookie();

  return (
    <VerticalNavProvider>
      <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
        <ThemeProvider direction={direction}>{children}</ThemeProvider>
      </SettingsProvider>
    </VerticalNavProvider>
  );
};

export default Providers;
