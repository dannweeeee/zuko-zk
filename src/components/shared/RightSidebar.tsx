import CommunityView from "../views/CommunityView";

async function RightSidebar() {

  return (
    <section className='custom-scrollbar rightsidebar'>
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='font-bold text-light-1'>
          Suggested Communities
        </h3>
        <div className='flex w-[350px] flex-col gap-9'>
          <CommunityView />
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;