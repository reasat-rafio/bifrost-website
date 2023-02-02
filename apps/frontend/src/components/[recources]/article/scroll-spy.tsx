import clsx from "clsx";

export interface SectionHeaderProps {
  _key: string;
  text: string;
}

interface ScrollSpyProps {
  className?: string;
  sectionHeaders: SectionHeaderProps[];
  navHeight: number;
}

export const ScrollSpy: React.FC<ScrollSpyProps> = ({
  className,
  navHeight,
}) => {
  return (
    <div className={clsx(className, "")}>
      <nav style={{ top: `${navHeight + 20}px` }} className="!sticky ">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
        perspiciatis cum sapiente ducimus illum aliquam rerum! Repellendus ipsa
        et fugit.
      </nav>
    </div>
  );
};
