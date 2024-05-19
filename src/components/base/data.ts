type badgeType = { [method: string]: { title: string; bg: string; border: string } };

export const dataBadge: badgeType = {
  post: {
    title: 'POST',
    bg: 'dark:border-green-300 text-green-500 dark:text-green-300',
    border: 'border-l-2 border-green-500 ',
  },

  patch: {
    title: 'PATCH',
    bg: 'dark:border-blue-300 text-blue-500 dark:text-blue-300',
    border: 'border-l-2 border-blue-500 ',
  },
  get: {
    title: 'GET',
    bg: 'dark:border-blue-300 text-blue-500 dark:text-blue-300',
    border: 'border-l-2 border-blue-500 ',
  },
  put: {
    title: 'PUT',
    bg: 'dark:border-orange-300 text-orange-500 dark:text-orange-300',
    border: 'border-l-2 border-orange-500 ',
  },

  head: {
    title: 'HEAD',
    bg: 'dark:border-orange-300 text-orange-500 dark:text-orange-300',
    border: 'border-l-2 border-orange-500 ',
  },

  connect: {
    title: 'CONNECT',
    bg: 'dark:border-orange-300 text-orange-500 dark:text-orange-300',
    border: 'border-l-2 border-orange-500 ',
  },
  options: {
    title: 'OPTIONS',
    bg: 'dark:border-orange-300 text-orange-500 dark:text-orange-300',
    border: 'border-l-2 border-orange-500 ',
  },
  trace: {
    title: 'TRACE',
    bg: 'dark:border-orange-300 text-orange-500 dark:text-orange-300',
    border: 'border-l-2 border-orange-500 ',
  },
  delete: {
    title: 'DELETE',
    bg: 'dark:border-red-300 text-red-500 dark:text-red-300',
    border: 'border-l-2 border-red-500',
  },
  default: { title: 'desconhecido', bg: 'bg-gray-500', border: 'border-l-2 border-gray-500' },
};
