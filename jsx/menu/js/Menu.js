const Menu = ({items, opened = false}) => {
    return <div className={opened ? 'menu menu-open' : 'menu'}>
        <div className="menu-toggle"><span></span></div>
        {opened && <MenuItems items={items}/>}
    </div>
};

const MenuItems = ({items}) => {
    return <nav>
        <ul>
            {items.map(item => <MenuListItem item={item}/>)}
        </ul>
    </nav>
};

const MenuListItem = ({item}) => (
    <li><a href={item.href}>{item.title}</a></li>
);