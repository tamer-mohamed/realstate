import {Link} from 'react-router';

const Pagination = ({num,current,baseURL})=>{
  let pages = [];
  let total = num + 1;

  for(let i = 1; i <= total; i++){
    let page = current === i ? <span>{i}</span> : <Link to={`${baseURL}/page/${i}`}>{i}</Link>;
    pages.push(page);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="pagination">
            {pages}

          </div>
        </div>
      </div>
    </div>
  )
};

export default Pagination;
