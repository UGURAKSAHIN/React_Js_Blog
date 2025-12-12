
import axios from "axios";

class OtherLanguageServices {   
    headerLanguageServices(language) {
        axios.defaults.headers['accept-language'] = language;
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new OtherLanguageServices();