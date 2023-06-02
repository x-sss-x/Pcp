import { VariantProps, cva } from "class-variance-authority";
import { AiFillCheckSquare } from "react-icons/ai";

export type ButtonProps = VariantProps<typeof buttonStyles>;

export const buttonStyles = cva("px-2 py-2 flex items-center justify-center rounded-full", {
  variants: {
    intent: {
      primary:  "",
    },
    fullwidth: {
      true: "w-full"
    },
  },
  defaultVariants: {
    intent: "primary"
  },
});

interface ButtonExtendedProps extends ButtonProps {
  children: string;
  childrens: string;
  LeftIcon?: React.ReactNode;
  width?: string;
  height?: string;
}

export default function Filter({
  intent,
  fullwidth,
  children,
  childrens,
  LeftIcon,
  width,
  height,
  ...props
}: ButtonExtendedProps) {
  const buttonStyle = {
    width : "170px" , height : "24px"
  };

  return (
    <><button className={buttonStyles({ intent, fullwidth })} style={buttonStyle} {...props}>
          {LeftIcon && <div className="text-lg pr-3">{LeftIcon}</div>}
          {children}
      </button>
      <AiFillCheckSquare className={buttonStyles({ intent, fullwidth })} style={buttonStyle} {...props}>
              {childrens}
          </AiFillCheckSquare></>
  );
  
}