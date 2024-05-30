import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [owner, setOwner] = useState(null);
  const [message, setMessage] = useState("");
  const fetchOwner = async () => {
    try {
      const user = await fetch(`/api/user/${listing.userRef}`);
      const data = await user.json();
      if (data.success) {
        return console.log("User not found");
      }
      setOwner(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOwner();
  }, []);
  return (
    <div>
      {owner && (
        <>
          <p>
            Contact {owner.username} for {listing.name}
          </p>
          <textarea
            className="p-3 w-full rounded-lg my-5"
            onChange={(e) => setMessage(e.target.message)}
            value={message}
            name=""
            id=""
            rows="2"
          />
          <Link
            to={`mailto:${owner.email}?subject=Regarding ${listing.name}&body=${message}`}
          >
            <button className="bg-slate-700 text-white p-3 w-full rounded-lg hover:opacity-95">
              Send Message
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Contact;
