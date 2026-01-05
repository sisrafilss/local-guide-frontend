function Meta({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4" />
      <span>{text}</span>
    </div>
  );
}

export default Meta;
