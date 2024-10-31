import Form from '@/components/creators/create-form';
// import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
 
export default function Page() {
 
  return (
    <main>
      {/* <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      /> */}
      <div className="flex-grow px-4 md:overflow-y-auto md:px-12 pt-4">
        <Form/>
      </div>
    </main>
  );
}