import Head from 'next/head'
import React from 'react'


const hobbies = [{
    id: '01',
    name: 'eating',
}, {
    id: '02',
    name: 'sleeping',
}, {
    id: '03',
    name: 'fishing',
}, {
    id: '04',
    name: 'art',
}, {
    id: '05',
    name: 'blogging',
}, {
    id: '06',
    name: 'card games',
}, {
    id: '07',
    name: 'baseball',
}, {
    id: '08',
    name: 'soccer',
},]


type Data = {
    a :string,
    b :string,
    c :string,
    d :string[],
    e :string,
}

type Errors<T> = {
    [K in keyof T] ?:string[]
}

const initial = {a: 'fetched.', b: 'fetched.', c: 'fetched.', d: ['01', '02',], e: 'fetched.',}

export default function Component()
{
    const dID = React.useMemo(() => hobbies.map((hobby) => hobby.id), [])
    const [gDisabled, sDisabled] = React.useState<boolean>(false)
    const [gDialog, sDialog] = React.useState<string>('')
    const [gErrors, sErrors] = React.useState<Errors<Data>>({})
    const [gGenres, sGenres] = React.useState<string[]>(initial.d)
    const formRef = React.useRef<HTMLFormElement>(null)

    React.useEffect(() => {
        if(!(formRef.current instanceof HTMLFormElement)) return
        const uls = formRef.current.querySelectorAll<HTMLUListElement>('fieldset > div > ul.errors')
        if(uls.length == 0) return
        const div = uls[0].parentElement as HTMLDivElement
        div.scrollIntoView({behavior: 'smooth'})
    }, [gErrors])

    const change :React.ChangeEventHandler<HTMLInputElement> = (change) => {
        if(!(change.target instanceof HTMLInputElement)) return
        if(!(change.target.form instanceof HTMLFormElement)) return
        const ds = (new FormData(change.target.form)).getAll('d') as string[]
        sGenres(() => ds)
    }

    const submit :React.FormEventHandler<HTMLFormElement> = (submit) => {
        submit.preventDefault()
        const form = submit.target
        if(!(form instanceof HTMLFormElement)) return
        const dialog = form.nextElementSibling
        if(!(dialog instanceof HTMLDialogElement)) return
        sDisabled(() => true)
        const fd = new FormData(form)
        const data = {...Object.fromEntries(fd), d: fd.getAll('d')}
        console.log(data)

        const time = Math.floor(Math.random() * 3)
        if(time == 2){
            sDialog(() => 'SUCCESS!!')
            dialog.showModal()
            sErrors(() => ({}))
            form.scrollIntoView({behavior: 'smooth'})
            return
        }
        sDialog(() => 'NG!!')
        dialog.showModal()
        sDisabled(() => false)
        const t = ['dammy error!']
        sErrors(() => ({...(time == 1 
            ? {b: t}
            : {a: t})}))
    }

    const dialogOpen :React.MouseEventHandler<HTMLInputElement> = async (open) => {
        open.preventDefault()
        if(!(open.target instanceof HTMLInputElement)) return
        const dialog = open.target.nextElementSibling
        if(!(dialog instanceof HTMLDialogElement)) return
        dialog.showModal()
    }

    const keyDown :React.KeyboardEventHandler<HTMLInputElement> = async (key) => {
        if(key.key.toLowerCase() != 'enter') return
        key.preventDefault()
        if(!(key.target instanceof HTMLInputElement)) return
        const dialog = key.target.nextElementSibling
        if(!(dialog instanceof HTMLDialogElement)) return
        dialog.showModal()
    }

    const dialogClose :React.MouseEventHandler<HTMLDialogElement> = async (click) => {
        if(!(click.target instanceof HTMLDialogElement)) return
        click.target.close()
    }

    const buttonClick :React.MouseEventHandler = async (click) => {
        click.preventDefault()
        sDisabled(() => false)
        if(!(click.target instanceof HTMLButtonElement)) return
        const form = click.target.form
        if(!(form instanceof HTMLFormElement)) return
        form.scrollIntoView({behavior: 'smooth'})
    }

    const d2string = React.useCallback((gs :string[]) :string => {
        gs.sort()
        const dv :string[] = []
        for(let i = 0; i < gs.length; i++){
            const n = dID.indexOf(gs[i])
            if(n < 0) continue
            dv.push(hobbies[n].name)
        }
        return dv.join(', ')
    }, [])


    return <>
        <Head>
            <title>dialog tag and scroll to something.</title>
            <meta name="description" content="using dialog and scrollIntoView" />
            <meta property="og:url" content="https://vercel.yossoi.com/examples/dialog_scroll"/>
            <meta property="og:title" content="dialog tag and scroll to something."/>
            <meta property="og:description" content="using dialog and scrollIntoView"/>
        </Head>
        <main>
            <article>
                <section>
                    <h2>using dialog and scrollIntoView</h2>
                    <p>this form has a one-third chance of success.</p>
                </section>
                <section>
                    <h2>example</h2>
                    <form onSubmit={submit} ref={formRef}>
                        <fieldset disabled={gDisabled}>
                            <legend>form sample</legend>
                            <div>
                                <div>
                                    <label>about something</label>
                                    <div>
                                        <input 
                                            type='text'
                                            name='a'
                                            defaultValue={initial.a}
                                            required
                                        />
                                    </div>
                                </div>
                                {errors(gErrors?.a)}
                            </div>

                            <div>
                                <div>
                                    <label>about something</label>
                                    <div>
                                        <input
                                            type='text'
                                            name='b'
                                            defaultValue={initial.b}
                                            required 
                                        />
                                    </div>
                                </div>
                                {errors(gErrors?.b)}
                            </div>

                            <div>
                                <div>
                                    <label>about something</label>
                                    <div>
                                        <input
                                            type='text'
                                            name='c'
                                            defaultValue={initial.c}
                                            required 
                                        />
                                    </div>
                                </div>
                                {errors(gErrors?.c)}
                            </div>

                            <div>
                                <div>
                                    <label>about something</label>
                                    <div>
                                        <textarea
                                            name='e'
                                            defaultValue={initial.e}
                                            required 
                                        >
                                        </textarea>
                                    </div>
                                </div>
                                {errors(gErrors?.e)}
                            </div>

                            <div>
                                <div>
                                    <label>about something</label>
                                    <div>
                                        <input
                                            type='text'
                                            value={d2string(gGenres)}
                                            readOnly
                                            role='button'
                                            onClick={dialogOpen}
                                            onKeyDown={keyDown}
                                        />
                                        <dialog onClick={dialogClose}>
                                            <div>
                                                <ul className='checkbox'>
                                                    {hobbies.map((hobby, i) => <li key={i}>
                                                        <input
                                                            type='checkbox'
                                                            name='d'
                                                            value={hobby.id}
                                                            id={`hobby-${i}`}
                                                            checked={gGenres.includes(hobby.id)}
                                                            onChange={change}
                                                        />
                                                        <label htmlFor={`hobby-${i}`}>{hobby.name}</label>
                                                    </li>)}
                                                </ul>
                                            </div>
                                        </dialog>
                                    </div>
                                </div>
                                {errors(gErrors?.d)}
                            </div>
                        </fieldset>
                        {
                            gDisabled
                                ? <button type="button" onClick={buttonClick}>edit</button>
                                : <button type="submit">send</button>
                        }
                        
                    </form>
                    <dialog onClick={dialogClose}>
                        <div>{gDialog}</div>
                    </dialog>
                </section>
            </article>
        </main>
    </>
}

function errors(e :(string[] | undefined)) :JSX.Element
{
    return (e == undefined || e.length == 0) 
        ? <></>
        : <>
        { e && <ul className='errors'>
            {e.map((f, i) => <li key={i}>{f}</li>)}
            </ul>}
        </>
}