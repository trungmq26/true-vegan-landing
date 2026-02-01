import { FunctionComponent } from 'react';
import styles from './Header.module.css';

const Header: FunctionComponent = () => {
  return (
    <div className={styles.headerContainer}>
      <b className={styles.snPhmDinhContainer}>
        <span>Sản Phẩm Dinh DƯỠNG CHÍNH HÃNG Theo Công Thức Của </span>
        <span className={styles.tinSLng}>Tiến Sỹ. Lương Y Ngô Đức Vượng</span>
      </b>
    </div>
  );
};

export default Header;
