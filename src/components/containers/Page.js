import { Component } from "React";
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';

export const Page = (ComposedComponent, specs) => class extends Component {
  constructor(props){
    super(props);
    this.state = {data: null};
  }

  render(){
    let {className,title} = specs;
    let classname = className ? className + ' page-wrap' : 'page-wrap';
    return (
      <div className={classname}>
        <div className="container">
          <div className="page-contents">

            {title ? <h2 className="page-title"><FormattedMessage id={title}/></h2> : null}

            <ComposedComponent {...this.props} data={this.state.data}/>

          </div>
        </div>
      </div>
    )
  }
};

