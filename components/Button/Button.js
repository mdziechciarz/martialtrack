import styles from './Button.module.css';

const Button = ({
  className = '',
  text,
  onClick,
  icon: Icon = null,
  iconLeft = false,
  secondary = false,
  grow = false,
}) => {
  return (
    <button
      className={`${styles.button} ${className} ${secondary ? styles.buttonSecondary : ''}`}
      onClick={onClick}
    >
      {Icon && iconLeft && (
        <i className={styles.icon}>
          <Icon />
        </i>
      )}
      <span className={styles.text}>{text}</span>
      {Icon && !iconLeft && (
        <i className={styles.icon}>
          <Icon />
        </i>
      )}
    </button>
  );
};

export default Button;
