import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;

    return (
      <div className="card my-3" style={cardStyle}>
        <img src={imageUrl} className="card-img-top" alt="News" style={imageStyle} />
        <div className="card-body" style={bodyStyle}>
          <h5 className="card-title" style={titleStyle}>{title}</h5>
          <p className="card-text" style={descriptionStyle}>{description}...</p>
          <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={buttonStyle}>Read More</a>
        </div>
      </div>
    );
  }
}

const cardStyle = {
  width: '18rem', 
  height: '25rem',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between', 
  transition: 'transform 0.2s ease',
};

const imageStyle = {
  width: '100%',
  height: '12rem', 
  objectFit: 'cover', 
};

const bodyStyle = {
  flex: '1', 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between', 
};

const titleStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '10px',
  flexGrow: '1', 
  overflow: 'hidden', 
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
};

const descriptionStyle = {
  fontSize: '0.9rem',
  color: '#666',
  lineHeight: '1.3',
  height: '4rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 3, 
  WebkitBoxOrient: 'vertical',
};

const buttonStyle = {
  backgroundColor: '#007BFF',
  border: 'none',
  borderRadius: '5px',
  padding: '8px 12px',
  marginTop: '10px',
};

export default NewsItem;
