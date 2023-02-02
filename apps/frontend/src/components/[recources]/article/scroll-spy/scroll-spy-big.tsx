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

export const ScrollSpyBig: React.FC<ScrollSpyProps> = ({
  className,
  navHeight,
  sectionHeaders,
}) => {
  return (
    <aside className={clsx(className, " relative mt-10")}>
      <nav style={{ top: `${navHeight + 20}px` }} className="!sticky pl-5">
        <ul className="space-y-3 capitalize">
          {sectionHeaders.map(({ _key, text }) => (
            <li key={_key} className="cursor-pointer text-body-3">
              {text}
            </li>
          ))}
        </ul>
        <div
          className="absolute left-0 top-0 h-[50vh] w-[2px] rounded"
          style={{
            background: `linear-gradient(91.41deg, #70FCEB 4.55%, #9BB8FF 51.06%, #B794FF 91.28%)`,
          }}
        />
      </nav>
    </aside>
  );
};
