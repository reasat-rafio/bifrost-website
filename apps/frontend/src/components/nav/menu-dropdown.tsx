import { Portal } from '@reach/portal'
import { DropdownListProps } from 'lib/@types/global-types'

interface MenuDropdownProps {
  dropdownList: DropdownListProps[]
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({ dropdownList }) => {
  return (
    <Portal>
      <div className="absolute top-[250%] bg-black rounded-[8px] p-10 w-[500px] overflow-visible">
        <ul>
          {dropdownList.map(({ _key, title, description }) => (
            <li key={_key}>
              <div>
                <span>{title}</span>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ul>
        //{' '}
      </div>
    </Portal>
  )
}
