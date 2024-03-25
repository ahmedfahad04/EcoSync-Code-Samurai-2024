import { ReactNode, useEffect, useState } from "react";

import { TooltipPosition } from "@/constants/Global";

interface TooltipProps {
  customClass?: string;
  content: Array<string>;
  children: ReactNode;
  position?: TooltipPosition;
}

const Tooltip: React.FC<TooltipProps> = ({
  customClass = "",
  content,
  children,
  position = TooltipPosition.BOTTOM,
}: TooltipProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [positionClasses, setPositionClasses] = useState<string>("");

  useEffect(() => {
    switch (position) {
      case TooltipPosition.TOP:
        setPositionClasses("bottom-full right-0 -translate-y-1");
        break;
      case TooltipPosition.BOTTOM:
        setPositionClasses("top-full right-0 translate-y-1");
        break;
      case TooltipPosition.LEFT:
        setPositionClasses(
          "right-full top-1/2 -translate-x-2 -translate-y-1/2"
        );
        break;
      case TooltipPosition.RIGHT:
        setPositionClasses("left-full top-1/2 translate-x-2 -translate-y-1/2");
        break;
    }
  }, []);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div
      className={`relative ${customClass}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {visible && (
        <div
          className={`absolute z-10 w-max whitespace-pre-line rounded-lg bg-white p-2.5 text-xs font-semibold text-black shadow-tooltip ${positionClasses}`}
        >
          {content.map((item, index) => (
            <p key={index} className="p-1">
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
