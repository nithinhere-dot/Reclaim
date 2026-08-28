import { Link } from 'react-router-dom';


function Home() {
  return (
    <div className="home">
      <nav className="home-nav">
        <div className="nav-brand">♻️ Reclaim</div>
        <div className="nav-links">
          <Link to="/login" className="btn btn-outline">Log In</Link>
          <Link to="/signup" className="btn btn-primary">Get Started</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-badge">🌱 Making waste management simple</div>
        <h1 className="hero-title">
          Turn Waste Into <span className="gradient-text">Opportunity</span>
        </h1>
        <p className="hero-subtitle">
          Reclaim connects waste posters with collectors — making recycling 
          accessible, efficient, and rewarding for everyone.
        </p>
        <div className="hero-actions">
          <Link to="/signup" className="btn btn-primary btn-lg">
            Start Reclaiming →
          </Link>
          <Link to="/login" className="btn btn-outline btn-lg">
            I have an account
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🗑️</div>
          <h3>Post Waste</h3>
          <p>Have waste that needs proper disposal? Post a job and let collectors come to you.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Find Jobs</h3>
          <p>Collectors browse open jobs nearby, accept them, and earn from recycling.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">✅</div>
          <h3>Track Progress</h3>
          <p>Follow your jobs from posting to completion. Stay informed every step of the way.</p>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h4>Sign Up</h4>
            <p>Create an account as a poster or collector</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h4>Post or Browse</h4>
            <p>Posters create jobs, collectors find them</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h4>Reclaim</h4>
            <p>Waste gets collected and properly recycled</p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>♻️ Reclaim — Waste management, simplified.</p>
      </footer>
    </div>
  );
}

export default Home;
