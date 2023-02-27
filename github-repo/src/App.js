import React from 'react'
import axios from 'axios'


class App extends React.Component {
  state = {
    repos: [],
    sortBy: ['stars','forks']
  }


  componentDidMount() {
    axios
      .get(`https://v1.nocodeapi.com/ojasaklechyt/github/bGEwVWsGZaXNrmXS/repos?username=ojasaklechayt`)
      .then(res => this.setState({ repos: res.data }))
  }

  handleSort = param => {
    this.setState({ sortBy: param })
  }


  // Sort repos by number of stars
  sortByStars = () => {
    this.state.repos.sort((a, b) => {
      return b.stargazers_count - a.stargazers_count
    })
  }


  // Sort repos by number of forks
  sortByForks = () => {
    this.state.repos.sort((a, b) => {
      return b.forks_count - a.forks_count
    })
  }


  render() {
    const { repos, sortBy } = this.state
    // Call sortByStars or sortByForks depending on sortBy state
    if (sortBy === 'stars') this.sortByStars()
    else if (sortBy === 'forks') this.sortByForks()


    return (
      <div className="App" style={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        background: '#0ccbee'
      }}>
        <h1>GitHub Repos</h1>
        <h2>Considering my own GitHub Repository - ojasaklechyt</h2>
        <div className="sort-options" style={{margin:'10px'}}>
          <button onClick={() => this.handleSort('stars')} style={{padding:'10px'}}>Sort by stars</button>
          <p>    </p>
          <button onClick={() => this.handleSort('forks')} style={{padding:'10px'}}>Sort by forks</button>
        </div>
        <ul>
          {repos.map(repo => (
            <li key={repo.id}>
              <a href={repo.html_url}>{repo.name}</a>
            </li>
          ))}
        </ul>
      </div>
    )

  }
}


export default App