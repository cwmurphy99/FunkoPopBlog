export const Comment = ({ comment }) => {
    return (
        <section style={{
            border: "1px solid black",
            margin: "10px"
        }}>
            {/* <p style={{ marginLeft: "10px" }}><strong>Subject: </strong>{comment.subject}</p> */}
            <p style={{ marginLeft: "10px" }}><strong>Content: </strong>{comment.content}</p>
            <p style={{ marginLeft: "10px" }}><strong>Author: </strong>{comment.userProfile.displayName}</p>
            <p style={{ marginLeft: "10px" }}><strong>Created on: </strong>{comment.createDateTime.split('T')[0]}</p>
        </section>
    );
}