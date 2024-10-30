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
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <Form/>
      </div>
    </main>
  );
}