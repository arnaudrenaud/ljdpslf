import PropTypes from 'prop-types';

const LoadingIndicator = ({ center }): JSX.Element => (
  <span className="wrapper">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      fill="black"
    >
      <path
        opacity=".25"
        d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
      />
      <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 16 16"
          to="360 16 16"
          dur="0.625s"
          repeatCount="indefinite"
        />
      </path>
    </svg>

    <style jsx>{`
      .wrapper {
        min-height: 42px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: ${center ? 'center' : 'initial'};
      }
    `}</style>
  </span>
);

LoadingIndicator.propTypes = {
  center: PropTypes.bool,
};

LoadingIndicator.defaultProps = {
  center: true,
};

export default LoadingIndicator;