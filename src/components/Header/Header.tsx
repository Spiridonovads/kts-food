import style from './style.module.css';
import logo from '../../../public/logo.svg';
import Text from 'components/Text/Text';
import ManIcon from 'components/Icon/ManIcon/MainIcon';
import HeartIcon from 'components/Icon/HeartIcon/HeartIcon';

function Header() {
  return (
    <header>
      <div className={style.wrapper}>
        <a href="#" className={style.logo}>
          <img src={logo} alt="logo"></img>
          <Text view="p-20" weight="bold" color="primary">
            Food Client
          </Text>
        </a>
        <ul className={style.list}>
          <li className={style.li}>
            <a href="#">
              <Text view="p-16" weight="normal" color="primary">
                Recipes
              </Text>
            </a>
          </li>
          <li>
            <a href="#">
              <Text view="p-16" weight="normal" color="primary">
                Ingradients
              </Text>
            </a>
          </li>
          <li>
            <a href="#">
              <Text view="p-16" weight="normal" color="primary">
                Products
              </Text>
            </a>
          </li>
          <li>
            <a href="#">
              <Text view="p-16" weight="normal" color="primary">
                Menu Items
              </Text>
            </a>
          </li>
          <li>
            <a href="#">
              <Text view="p-16" weight="normal" color="primary">
                Meal Planning
              </Text>
            </a>
          </li>
        </ul>
        <div className={style.personal}>
          <a href="#">
            <ManIcon color="accent" />
          </a>
          <a href="#">
            <HeartIcon color="accent" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
