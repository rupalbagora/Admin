import React, { useState } from 'react';

interface CopyReferralLinkProps {
  userId: string;
}

const CopyReferralLink: React.FC<CopyReferralLinkProps> = ({ userId }) => {
  const [copied, setCopied] = useState(false);

  const referralUrl = `${window.location.origin}/auth/register?ref=${userId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-sm flex items-center justify-between space-x-2">
      <input
        type="text"
        value={referralUrl}
        readOnly
        className="flex-1 px-3 py-2 border rounded text-sm"
      />
      <button
        onClick={handleCopy}
        className="bg-gray-600 hover:bg-gray-700 text-white text-sm px-3 py-2 rounded"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default CopyReferralLink;
