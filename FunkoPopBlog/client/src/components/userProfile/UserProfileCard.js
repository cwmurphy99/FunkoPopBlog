export const UserProfileCard = ({ firstName, displayName }) => {
    return (
        <div className="ProfileCard" style={{
            border: "1px solid black",
            padding: "5px"
        }}>
            <h4>{displayName}</h4>
            <p>Welcome back! {firstName}</p>
            {/* <p>Email: {email}</p> */}
        </div>
    );
}