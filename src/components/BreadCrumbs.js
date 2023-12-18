import React from 'react'
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";


const BreadCrumbs = ({title, category}) => {
  const routes = [
    { path: "/:category", breadcrumb: category },
    { path: "/", breadcrumb: "Home" },
    { path: "/:category/:pid/:title", breadcrumb: title }
  ];
  const breadcrumbs = useBreadcrumbs(routes)
  return (
    <div className='text-[14px] flex items-center gap-1'>
      {breadcrumbs?.filter(el=>!el.match.route === false).map(({ match, breadcrumb }, index, self) => (
        <Link className='flex items-center gap-1 hover:text-main' key={match.pathname} to={match.pathname}>
          <span className='capitalize'>{breadcrumb}</span>
          {index !== self.length - 1 && <IoIosArrowForward />}
        </Link>
      ))}
    </div>
  )
}

export default BreadCrumbs