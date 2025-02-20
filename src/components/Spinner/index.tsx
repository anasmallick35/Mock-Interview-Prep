import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
export const Spinner = () => {
  return (
    <div className="h-screen flex justify-center items-center">
     <FontAwesomeIcon icon={faCircleNotch} spin size="2x" />
    </div>
  );
}; 