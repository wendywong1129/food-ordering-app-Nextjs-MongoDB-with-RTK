import styles from "../styles/Add.module.css";

const AddButton = ({ setIsAdd }) => {
  return (
    <div onClick={() => setIsAdd(true)} className={styles.mainAddButton}>
      Add New Pizza
    </div>
  );
};

export default AddButton;
