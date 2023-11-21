// NotificationsDropdown.jsx
import {React, useEffect,useState} from 'react';
import { List, Avatar } from 'antd';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import './NotificationsDropdown.css'; // Agrega un archivo de estilos para este componente

const NotificationsDropdown = ({ notifications,referenceElement, onClose }) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    useEffect(() => {
        if (referenceElement) {
          const rect = referenceElement.getBoundingClientRect();
          const dropdownWidth = 350;
          setPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left - dropdownWidth + window.scrollX,
          });
        }
      }, [referenceElement]);
    
  return (
    <div className="notifications-dropdown"  style={{ top: position.top, left: position.left }}>
      <List
        dataSource={notifications}
        renderItem={(item) => (
            <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<NotificationsRoundedIcon />} />}
              title={<a href="#">{item.message}</a>}
              description={<div>{item.timestamp}</div>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default NotificationsDropdown;
