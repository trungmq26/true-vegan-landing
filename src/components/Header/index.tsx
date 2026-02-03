import { FunctionComponent } from 'react';
import styles from './Header.module.css';

const Header: FunctionComponent = () => {
  return (
    <div className={styles.headerContainer}>
      <b className={styles.snPhmDinhContainer}>
        <span>SẢN PHẨM DINH DƯỠNG CHÍNH HÃNG THEO CÔNG THỨC CỦA </span>
        <span className={styles.tinSLng}>TIẾN SỸ. LƯƠNG Y NGÔ ĐỨC VƯỢNG</span>
      </b>
    </div>
  );
};

export default Header;
