import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
  }

  // Fetch news as soon as the component mounts
  async componentDidMount() {
    this.fetchNews();
  }

  // Fetch news from the API
  async fetchNews() {
    this.setState({ loading: true }); // Show loader while fetching data

    try {
      let { page } = this.state;
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0b99f46e00d64e1fb6bd77c8ec5b131e&page=${page}&pageSize=12`;
      
      let response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      let data = await response.json();
      
      // Ensure totalResults is updated correctly
      this.setState({ 
        articles: data.articles, 
        totalResults: data.totalResults, 
        loading: false 
      });
      
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false }); // Hide loader in case of error
    }
  }

  // Handle previous page
  handlePrevious = async () => {
    this.setState(
      prevState => ({ page: prevState.page - 1 }), 
      this.fetchNews // callback to fetch updated page data
    );
  };

  // Handle next page
  handleNext = async () => {
    const { page, totalResults } = this.state;
    const totalPages = Math.ceil(totalResults / 12);

    if (page < totalPages) {
      this.setState(
        prevState => ({ page: prevState.page + 1 }), 
        this.fetchNews // callback to fetch updated page data
      );
    }
  };

  render() {
    const { articles, page, totalResults, loading } = this.state;
    const totalPages = Math.ceil(totalResults / 12);

    return (
      <div>
        <div className="container my-3">
          {/* Show loading spinner when loading */}
          {loading ? <h2>Loading...</h2> : (
            <div className="row">
              {articles.map((element, index) => {
                return (
                  <div className="col-md-3" key={index}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 95) : ""}
                      description={element.description ? element.description.slice(0, 100) : ""}
                      imageUrl={!element.urlToImage ? "https://deadline.com/wp-content/uploads/2024/10/Dakota-Johnson-Sean-Penn-Daddio.jpg?w=1024" : element.urlToImage}
                      newsUrl={element.url}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pagination buttons */}
        <div className="buttons d-flex justify-content-around my-4">
          <button 
            disabled={page <= 1} 
            type="button" 
            className="btn btn-secondary" 
            onClick={this.handlePrevious}
          >
            &larr; Previous
          </button>

          <button 
            disabled={page >= totalPages} 
            type="button" 
            className="btn btn-secondary" 
            onClick={this.handleNext}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
