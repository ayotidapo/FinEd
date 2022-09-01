import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';
import styles from './paginate.module.scss';

interface Props {
  totalCount: number;
  pageUrl?: string;
  onChangePage?: (e?: any) => void;
}

const Paginate: React.FC<Props> = (props) => {
  const router = useRouter();
  const initialPg = Number(router.query?.page) || 1;
  const { totalCount } = props;
  const noOfPage = Math.ceil(totalCount / 12);

  return (
    <div className={styles.pgnt_wrapper}>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next  >"
        onPageChange={props.onChangePage}
        initialPage={initialPg - 1}
        pageRangeDisplayed={1}
        pageCount={noOfPage}
        activeClassName={styles.activepagelink}
        previousLabel="<  Prev"
        disabledClassName={styles.dizabled}
        nextLinkClassName={initialPg < noOfPage ? styles.prev_next : ''}
        previousLinkClassName={initialPg > 1 ? styles.prev_next : ''}
        // renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Paginate;
