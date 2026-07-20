const userDeatils = async ({ params }: { params: Promise<{ id: String }> }) => {
  const { id } = await params;

  return (
    <div>
      <h1>User details for #{id}</h1>
    </div>
  );
};

export default userDeatils;
