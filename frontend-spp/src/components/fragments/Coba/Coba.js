import React from 'react'

export default function Coba() {
  return (
    <div className="wrap">
      <aside className="aside">
        <aside>
          {/* <a><img alt="logee" src="/assets/ic-logo.svg" /></a>
          <a className={styles.logOut} onClick={_handlerLogout}>
            <img alt="logout" src="/assets/ic-exit.svg" />
          </a> */}
        </aside>
        <section className="navContainer">
          <figure>
            {/* <img alt="profile" src={avatar} /> */}
            <figcaption>
              <h5>username</h5>
              <small>email</small>
            </figcaption>
          </figure>
          <nav className="nav">
            {/* {navs[roles[0]].map((n, idx) => (
              n.children ?
                <ExpandSider data={n} index={idx} key={idx} /> :
                <NavSider data={n} key={idx} />
            ))} */}
            Home
          </nav>
        </section>
      </aside>
      <main className="main">
        {/* {children} */}
      </main>
    </div>
  )
}

// export function ExpandSider({ data, index }) {
//   const [expand, setExpand] = useState({ active: -1, open: -1 });
//   const clickExpand = (index) => () => {
//     setExpand({ ...expand, open: expand.open === index ? -1 : index });
//   };
//   const isOpen = expand.open === index;
//   const { length } = data.children;
//   const { pathname } = useLocation();

//   useEffect(() => {
//     const activeChild = data.children.findIndex(i => i.to === pathname);

//     setExpand({ open: expand.open, active: activeChild });
//   }, [pathname]);

//   return (
//     <div className={styles['nav-item']} id={`sider-parent-${index}`}>
//       <section onClick={clickExpand(index)}>
//         <data.icon />
//         {data.name}
//         <img alt="expand" className={isOpen ? styles.open : ''} src="/assets/ic-expand.svg" />
//       </section>
//       <ul style={{ maxHeight: isOpen ? `${3 * length}rem` : 0 }}>
//         {data.children.map((c, cIdx) => {
//           const isActive = expand.active === cIdx;
//           return (
//             <li className={c.disabled ? styles.disable : ''} key={cIdx}>
//               <Link className={(isActive && !c.disabled) ? styles.active : ''} to={c.to}>{c.name}</Link>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// ExpandSider.defaultProps = {
//   data: {},
//   index: null,
// };

// ExpandSider.propTypes = {
//   data: PropTypes.object,
//   index: PropTypes.number,
// };

// export function NavSider({ data }) {
//   const { pathname } = useLocation();
//   const isActive = data.to === pathname.toLowerCase();
//   return (
//     <Link className={isActive ? styles.active : ''} to={data.to}>
//       <section>
//         <data.icon />
//         {data.name}
//       </section>
//     </Link>
//   );
// }

// NavSider.defaultProps = {
//   data: {},
// };

// NavSider.propTypes = {
//   data: PropTypes.object,
// };
