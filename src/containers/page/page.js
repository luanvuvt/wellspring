/**
 *   Page Container
 * =============================================================================
 */

// fetch polyfill
import 'whatwg-fetch';

// components
// import Button from '../../components/button/button.js';

class Page extends React.Component {
  constructor(props) {
    super();
    this.state = {
      page: []
    };
  }

  componentDidMount() {
    // fetch latest posts
    fetch('//' + window.location.hostname + '/wp-json/wp/v2/pages/?slug=' + this.props.params.slug)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          page: responseData
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        {this.state.page.map((current) =>
          <article className="page">
            <h1 className="page__title" dangerouslySetInnerHTML={{__html: current.title.rendered}} />
            <section className="page__entry" dangerouslySetInnerHTML={{__html: current.content.rendered}} />
          </article>
        )}
      </div>
    );
  }
}

export default Page
