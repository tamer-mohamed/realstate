import { Component } from "React";
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';

export const Page = (ComposedComponent, title) => class extends Component {
  constructor(props){
    super(props);
    this.state = {data: null};
  }

  render(){
    return (
      <div className="page-wrap">
        <div className="container">
          <div className="page-contents">
            <h2 className="page-title">
              <FormattedMessage id={title}/></h2>

            <ComposedComponent {...this.props} data={this.state.data}/>

          </div>
        </div>
      </div>
    )
  }
};

