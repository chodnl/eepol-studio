import { useEffect, useState } from 'react'

import {
    getPricing,
    createPricing,
    updatePricing,
    deletePricing,
} from '../../../components/admin/pricing/pricingApi'

import PricingList from '../../../components/admin/pricing/PricingList'
import PricingEditor from '../../../components/admin/pricing/PricingEditor'

function AdminPricing() {
    const [pricings, setPricings] = useState([])
    const [editingPricingId, setEditingPricingId] =
        useState(null)
    const [isCreateOpen, setIsCreateOpen] =
        useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        const loadPricing = async () => {
            try {
                const data = await getPricing()

                setPricings(data)
            } catch (error) {
                console.error(
                    'Pricing fetch error:',
                    error
                )

                setMessage(error.message)
            }
        }

        loadPricing()
    }, [])

    const handleOpenCreate = () => {
        setIsCreateOpen(true)
        setEditingPricingId(null)
        setMessage('')
    }

    const handleCancelCreate = () => {
        setIsCreateOpen(false)
    }

    const handleCreate = async (pricingData) => {
        try {
            const nextOrder =
                pricings.length > 0
                    ? Math.max(
                        ...pricings.map(
                            (pricing) =>
                                pricing.order
                        )
                    ) + 1
                    : 1

            const createdPricing =
                await createPricing({
                    ...pricingData,
                    order: nextOrder,
                })

            setPricings((prev) => [
                ...prev,
                createdPricing,
            ])

            setIsCreateOpen(false)
            setMessage('가격이 등록되었습니다.')
        } catch (error) {
            console.error(
                'Pricing create error:',
                error
            )

            setMessage(error.message)
        }
    }

    const handleEdit = (id) => {
        setEditingPricingId(id)
        setIsCreateOpen(false)
        setMessage('')
    }

    const handleCancelEdit = () => {
        setEditingPricingId(null)
    }

    const handleUpdate = async (id, pricingData) => {
        try {
            const updatedPricing =
                await updatePricing(
                    id,
                    pricingData
                )

            setPricings((prev) =>
                prev.map((pricing) =>
                    pricing._id ===
                        updatedPricing._id
                        ? updatedPricing
                        : pricing
                )
            )

            setEditingPricingId(null)
            setMessage('가격이 수정되었습니다.')
        } catch (error) {
            console.error(
                'Pricing update error:',
                error
            )

            setMessage(error.message)
        }
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            '이 가격 정보를 삭제하시겠습니까?'
        )

        if (!confirmed) {
            return
        }

        try {
            await deletePricing(id)

            setPricings((prev) =>
                prev.filter(
                    (pricing) =>
                        pricing._id !== id
                )
            )

            if (editingPricingId === id) {
                setEditingPricingId(null)
            }

            setMessage('가격이 삭제되었습니다.')
        } catch (error) {
            console.error(
                'Pricing delete error:',
                error
            )

            setMessage(error.message)
        }
    }

    return (
        <div>
            <h1>가격 관리</h1>

            <button
                type="button"
                onClick={handleOpenCreate}
            >
                가격 등록
            </button>

            {message && <p>{message}</p>}

            {isCreateOpen && (
                <PricingEditor
                    pricing={null}
                    onSave={handleCreate}
                    onCancel={handleCancelCreate}
                />
            )}

            <PricingList
                pricings={pricings}
                editingPricingId={
                    editingPricingId
                }
                onEdit={handleEdit}
                onDelete={handleDelete}
                renderEditor={(pricing) => (
                    <PricingEditor
                        pricing={pricing}
                        onSave={handleUpdate}
                        onCancel={
                            handleCancelEdit
                        }
                    />
                )}
            />
        </div>
    )
}

export default AdminPricing