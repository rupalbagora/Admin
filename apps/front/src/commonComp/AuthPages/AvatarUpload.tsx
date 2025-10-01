import React, { useState, useRef,type ChangeEvent } from "react";
import { Avatar } from "antd";
import { UploadOutlined, UserOutlined, LoadingOutlined } from "@ant-design/icons";

interface AvatarUploadProps {
  currentAvatar?: string;
  onUpload: (file: File) => Promise<void>;
  size?: number;
  shape?: "circle" | "square";
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentAvatar,
  onUpload,
  size = 128,
  shape = "circle",
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    try {
      setLoading(true);
      await onUpload(file);
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <div 
        onClick={handleClick}
        className="relative cursor-pointer hover:opacity-80 transition-opacity"
      >
        <Avatar
          size={size}
          shape={shape}
          src={preview || currentAvatar}
          icon={<UserOutlined />}
          className="border border-gray-200"
        />
        
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} />
          </div>
        )}
        
        <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-sm">
          <UploadOutlined className="text-gray-600" />
        </div>
      </div>
      
      <p className="mt-2 text-sm text-gray-500">
        Click to {currentAvatar ? 'change' : 'upload'} avatar
      </p>
    </div>
  );
};

export default AvatarUpload;