import Head from 'next/head'
import React from 'react'

type controlled = {
    a: string,
    b: string,
}


export default function Component() :JSX.Element
{

    <Head>
        <title>onchange and value pair</title>
        <meta name="description" content="onchange and value pair" />
        <meta property="og:url" content="https://vercel.yossoi.com/examples/onchange_value"/>
        <meta property="og:title" content="onchange and value pair"/>
        <meta property="og:description" content="onchange and value pair"/>
    </Head>



    const [gControlled, sControlled] = React.useState<controlled>({a: 'test', b: 'test'})

    const submit :React.FormEventHandler<HTMLFormElement> = async (submit) => {
        submit.preventDefault()
    }

    const throwChange :React.ChangeEventHandler = async () => {}

    const catchChange :React.ChangeEventHandler<HTMLFormElement> = async (change) => {
        if(!(change.target instanceof HTMLInputElement)) return
        sControlled(() => ({...gControlled, [change.target.name]: change.target.value}))
    }


    return <>
        <main>
            <article>
                <section>
                    <h2>For the rule that value and onChange are always paired</h2>
                    <pre>client.js:1 Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.</pre>
                    <p dangerouslySetInnerHTML={{__html: `I've been trying to figure out how to implement a controlled component in an easy and rule-compliant manner.`}}></p>
                    <p><a href="https://github.com/jsx-eslint/eslint-plugin-react/issues/3143">New Rule: onChange or readOnly prop when checked is set on an input element</a></p>
                    <pre>
                        <code>{`// logic section
const throwChange :React.ChangeEventHandler = async () => {}

const catchChange :React.ChangeEventHandler<HTMLFormElement> = async (change) => {
    if(!(change.target instanceof HTMLInputElement)) return
    sControlled(() => ({...gControlled, [change.target.name]: change.target.value}))
}

// return section
...
<form onSubmit={submit} onChange={catchChange}>
...
<input
    type='text'
    name='a'
    value={gControlled.a}
    required
    onChange={throwChange}
/>
...`}</code>
                    </pre>


                </section>
                <section>
                    <h2>example</h2>
                    <form onSubmit={submit} onChange={catchChange}>
                        <fieldset>
                            <legend>form sample</legend>
                            <div>
                                <div>
                                    <label>set onChange function</label>
                                    <div>
                                        <input 
                                            type='text'
                                            name='a'
                                            value={gControlled.a}
                                            required
                                            onChange={throwChange}
                                        />
                                    </div>
                                </div>
                            </div>
                       </fieldset>
                        <button type="submit" style={{marginTop: '0',}}>send</button>
                    </form>
                </section>
            </article>
        </main>
     </>
}