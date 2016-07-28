import {FormattedMessage, FormattedNumber, FormattedRelative} from 'react-intl';
import {hashHistory} from 'react-router';
import {Link} from 'react-router';

const LangSwitcher = (props)=>{
  const switchLang = function(lang){
    hashHistory.push(lang);
    return false;
  }

  let {langs , currentLang} = props;
  let lang = currentLang !== 'en' ? langs['en'] : langs['ar'];
  // remove current used lang

  return (
    <div className="user">
      <a  onClick={()=>switchLang(lang.code)}>{lang.text}</a>
    </div>

  )
};

export default LangSwitcher;
