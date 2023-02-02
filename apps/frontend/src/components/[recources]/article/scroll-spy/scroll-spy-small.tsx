import { SectionHeaderProps } from "./scroll-spy-big";

interface ScrollSpySmallProps {
  className?: string;
  sectionHeaders: SectionHeaderProps[];
  navHeight: number;
  intersecting: boolean;
}

export const ScrollSpySmall: React.FC<ScrollSpySmallProps> = ({}) => {
  return <aside></aside>;
};
