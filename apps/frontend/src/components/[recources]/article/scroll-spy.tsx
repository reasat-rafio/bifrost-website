export interface SectionHeaderProps {
  _key: string;
  text: string;
}

interface ScrollSpyProps {
  sectionHeaders: SectionHeaderProps[];
}

export const ScrollSpy: React.FC<ScrollSpyProps> = ({}) => {
  return <nav></nav>;
};
