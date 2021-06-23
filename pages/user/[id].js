import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

import { USER_DETAILS } from '@/graphql/queries'
import { DELETE_USER, UPDATE_USER } from '@/graphql/mutations'

import styles from 'styles/UserDetails.module.scss'

export default function UserDetails() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const {
    push,
    query: { id },
  } = useRouter()
  const { error, data } = useQuery(USER_DETAILS, {
    variables: { id },
  })
  const [updateUser, { loading: userUpdateInProgress }] =
    useMutation(UPDATE_USER)

  const [deleteUser, { loading: userDeleteInProgress }] =
    useMutation(DELETE_USER)

  const { register, handleSubmit } = useForm()

  const onSubmit = values => {
    updateUser({
      variables: {
        id,
        values,
      },
    }).then(() => {
      setIsEditMode(false)
    })
  }

  const handleDelete = () => {
    deleteUser({
      variables: { id },
      update: cache => {
        const normalizedId = cache.identify({ id, __typename: 'profiles' })
        cache.evict({ id: normalizedId })
        cache.gc()
      },
    }).then(() => {
      push('/')
    })
  }

  const toggleEditMode = () => {
    setIsEditMode(prevState => !prevState)
  }

  const toggleDeleteAlert = () => {
    if (window.confirm('Are you sure?')) {
      handleDelete()
    }
  }

  useEffect(() => {
    if (data) {
      setUser(data.profiles_by_pk)
      setLoading(false)
    }
  }, [data])

  if (error) return <p>{error.message}</p>

  return (
    <div className={styles.container}>
      {loading ? (
        'Loading...'
      ) : (
        <div className={styles.user}>
          <div className={styles.avatar}>
            <Image
              src={user.avatar}
              objectFit="cover"
              layout="fill"
              quality={100}
              alt="user"
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.info}>
              <h2>Name</h2>
              {isEditMode ? (
                <input {...register('name', { value: user.name })} />
              ) : (
                <span>{user.name}</span>
              )}
            </div>
            <div className={styles.info}>
              <h2>Age</h2>
              {isEditMode ? (
                <input {...register('age', { value: user.age })} />
              ) : (
                <span>{user.age}</span>
              )}
            </div>
            <div className={styles.info}>
              <h2>Occupation</h2>
              {isEditMode ? (
                <input
                  {...register('occupation', { value: user.occupation })}
                />
              ) : (
                <span>{user.occupation}</span>
              )}
            </div>
            {isEditMode && (
              <button
                className={`${styles.button} ${styles.editButton}`}
                type="submit"
                disabled={userUpdateInProgress}
              >
                Save
              </button>
            )}
            <button
              className={`${styles.button} ${styles.editButton}`}
              onClick={toggleEditMode}
              type="button"
              disabled={userUpdateInProgress || userDeleteInProgress}
            >
              {isEditMode ? 'Cancel' : 'Edit'}
            </button>
          </form>
          {!isEditMode && (
            <button
              className={`${styles.button} ${styles.deleteButton}`}
              onClick={toggleDeleteAlert}
              disabled={userDeleteInProgress}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// export async function getStaticPaths() {
//   const { data } = await client.query({
//     query: USER_DETAILS,
//   })

//   const paths = data.profiles.map(({ id }) => ({
//     params: { id },
//   }))

//   return { paths, fallback: false }
// }

// export async function getServerSideProps({ params }) {
//   const { data } = await client.query({
//     query: USER_DETAILS,
//   })

//   return {
//     props: {
//       countries: data.profiles_by_pk,
//     },
//   }
// }
