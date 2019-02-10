import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Swipe from './Swipe';
import { Link } from 'react-router-dom';
import { api } from './lib/api';
// import { getUserImage, getUserNickname } from './lib/user';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mammals: [],
    };
    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
    // Get mammals
    api
      .getMammals()
      .then(mammals => {
        this.setState({ mammals });

        // Make debugging easier
        window.mammals = mammals;
      })
      .catch(error => {
        console.log('Unable to fetch mammals!', error);
      });
  }

  handleVote(mammal, vote) {
    console.log('Voted for mammal', mammal.htmlId, vote);
    this.setState({
      mammals: this.state.mammals.map(thisMammal => {
        if (thisMammal === mammal) thisMammal.vote = vote ? 1 : -1;
        return thisMammal;
      }),
    });
  }

  render() {
    let yesVotes = 0;
    let noVotes = 0;
    this.state.mammals.forEach(({ vote }) => {
      if (vote === 1) return (yesVotes += 1);
      if (vote === -1) return (noVotes += 1);
    });
    return (
      <div>
        <Nav />
        <main>
          <h1 style={{ maxWidth: '100%', width: '500px', margin: '0 auto' }}>
            Would you drink this mammal's&nbsp;milk?
          </h1>
          <Swipe mammals={this.state.mammals} onVote={this.handleVote} />
          <div
            style={{
              padding: '1rem',
              width: '300px',
              maxWidth: '100%',
              margin: '0 auto 2rem',
            }}
          >
            <h2 style={{ textAlign: 'center' }}>Your Preferences:</h2>
            <ul>
              <li>Voted "Yes" for {yesVotes} mammals</li>
              <li>Voted "No" for {noVotes} mammals</li>
            </ul>
            {!this.props.isSignedIn && (
              <div>
                <Link to="/metrics/">Sign In</Link> to save your preferences!
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Home;
