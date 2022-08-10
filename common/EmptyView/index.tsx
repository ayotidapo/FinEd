/* eslint-disable @next/next/no-img-element */
const EmptyView = ({ contentName }: { contentName?: string }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '200px', height: '200px', marginTop: '50px' }}>
        <img src="/assets/empty.svg" alt="empty-state" />
      </div>
      <h2 className="title">{`No ${contentName}  found yet`}</h2>
    </div>
  );
};

export default EmptyView;
